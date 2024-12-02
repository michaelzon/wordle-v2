import { useEffect, useState} from "react";
import * as styles from "../styles.css";
import { json, type TypedResponse } from "@remix-run/cloudflare";
import {Form, Link, useActionData, useLoaderData} from "@remix-run/react";
import {getSession, commitSession, destroySession} from "~/sessions";

interface Tile {
    letter: string;
    evaluation: "" | "correct" | "present" | "absent";
}

interface Word {
    word: string;
}

interface ActionData {
    error: string | null;
    evaluation: Tile[] | null;
}

export function validateGuess(guess: string): string | null {
    if (guess.length !== 5) {
        return "Word must be 5 letters.";
    }
    return null;
}

export function evaluateGuess(guess: string, mysteryWord: string): Tile[] {
    return guess.split("").map((char, index): Tile => {
        if (char === mysteryWord[index]) {
            return { letter: char, evaluation: "correct" };
        } else if (mysteryWord.includes(char)) {
            return { letter: char, evaluation: "present" };
        } else {
            return { letter: char, evaluation: "absent" };
        }
    });
}

export const loader = async ({ request }: { request: Request }) => {
    const session = await getSession(request.headers.get("Cookie"));
    let sessionMysteryWord = session.get("mysteryWord");

    if (!sessionMysteryWord) {
        const response = await fetch(`https://api.datamuse.com/words?sp=?????`);
        const words: Word[]  = await response.json();
        sessionMysteryWord = words[Math.floor(Math.random() * words.length)].word.toLowerCase();
        session.set("mysteryWord", sessionMysteryWord);
    }

    return json(
        { sessionMysteryWord },
        {
            headers: {
                "Set-Cookie": await commitSession(session),
            },
        }
    );
};

export const action = async ({ request }: { request: Request }): Promise<TypedResponse<ActionData>> => {
    const session = await getSession(request.headers.get("Cookie"));
    const formData = await request.formData();

    if (formData.get("tryAgain")) {
        return json<ActionData>(
            { error: null, evaluation: null },
            {
                headers: {
                    "Set-Cookie": await destroySession(session),
                },
            }
        );
    }

    const guess = (formData.get("guess") as string).toLowerCase();
    const mysteryWord = session.get("mysteryWord");

    if (!mysteryWord) {
        return json<ActionData>({ error: "Mystery word is missing. Please refresh the game.", evaluation: null });
    }

    const validationError = validateGuess(guess);
    if (validationError) {
        return json<ActionData>({ error: validationError, evaluation: null });
    }

    const evaluation = evaluateGuess(guess, mysteryWord);

    return json<ActionData>({ error: null, evaluation });
};

export default function Play() {
    const [rows, setRows] = useState<Tile[][]>([]);
    const { sessionMysteryWord: mysteryWord } = useLoaderData<typeof loader>();
    const actionData = useActionData<ActionData>();
    const [turn, setTurn] = useState<number>(0);
    console.log(mysteryWord)
    const initRows = (): Tile[][] => {
        return Array(5)
            .fill(null)
            .map(() =>
                Array(5)
                    .fill(null)
                    .map(() => ({
                        letter: "",
                        evaluation: "",
                    }))
            );
    };

    useEffect(() => {
        const rows = initRows();
        setRows(rows);
    }, []);

    const [currentGuess, setCurrentGuess] = useState<string>("");

    useEffect(() => {
        if (actionData?.evaluation) {
            const newRows = [...rows];
            newRows[turn] = actionData.evaluation;
            setRows(newRows);
            setTurn(turn + 1);

            if (actionData.evaluation.every((tile: Tile) => tile.evaluation === "correct")) {
                alert("You guessed the word!");

            } else if (turn === 4) {
                alert(`Game over! The word was "${mysteryWord}".`);
            }
        }
    }, [actionData]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.grid} role="grid">
                {rows.map((row: Tile[], rowIndex) => (
                    <div className={styles.gridRow} role="row" key={rowIndex}>
                        {row.map((tile, colIndex) => {
                            const tileClasses = [
                                styles.gridItem,
                                tile.letter !== "" && styles.gridItemFilled,
                                tile.evaluation === "present" && styles.letterPresent,
                                tile.evaluation === "correct" && styles.letterCorrect,
                            ]
                                .filter(Boolean)
                                .join(" ");

                            return (
                                <div
                                    key={`${rowIndex}-${colIndex}`}
                                    className={tileClasses}
                                    role="gridcell"
                                    aria-label={`Letter ${tile.letter || "blank"}, Evaluation ${
                                        tile.evaluation || "none"
                                    }`}
                                >
                                    {tile.letter}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>

            <Form method="post">
                <input
                    type="text"
                    name="guess"
                    value={currentGuess}
                    onChange={(e) => setCurrentGuess(e.target.value.toLowerCase())}
                    maxLength={5}
                    placeholder="Enter your guess"
                    className={styles.input}
                />
                <input type="hidden" name={"mysteryWord"} value={mysteryWord}/>
                <button type="submit" className={`${styles.containerButton} theme`}>
                    Submit
                </button>
            </Form>
            {turn === 5 && (
                <Form method="post">
                    <input type="hidden" name="tryAgain" value="true"/>
                    <button type="submit" className={`${styles.containerButton} theme`}>
                        Try Again
                    </button>
                </Form>
            )}
            <footer className={"footer"}>
                <p className={"author"}>
                    Made by: Michael Zonneveld. <Link to={"https://github.com/michaelzon/wordle-v2"} className={styles.link}>View
                    on GitHub</Link>
                </p>
            </footer>
        </div>
    );

}
