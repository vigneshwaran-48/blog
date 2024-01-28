"use client";

import React, { useEffect, useRef, useState } from 'react';
import styles from "./compose.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

interface LineProps {
    index: number,
    text: string,
    onEnterCallback: (index: number) => void,
    focus?: boolean,
    onTextChange: (index: number, text: string) => void
}

const ParaLine = ({ index, text, onEnterCallback, focus = false, onTextChange }: LineProps) => {

    const pRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        if(focus && pRef.current) {
            pRef.current.focus();
        }
    }, []);

    return (
        <p
            ref={pRef}
            contentEditable={true}
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    e.preventDefault();
                    onEnterCallback(index);
                }
            }}
            onBlur={e => onTextChange(index, e.currentTarget.textContent || "")}
            suppressContentEditableWarning
        >
            { text }
        </p>
    );
};  

const H4Line = ({ index, text, onEnterCallback, onTextChange }: LineProps) => {

    return (
        <h4
            contentEditable={true}
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    e.preventDefault();
                    onEnterCallback(index);
                }
            }}
            onBlur={e => onTextChange(index, e.currentTarget.textContent || "")}
            suppressContentEditableWarning
        >
            { text }
        </h4>
    );
};

interface BlogContent {
    index: number,
    text: string,
    type: "p" | "h4",
    focus?: boolean
}
const BlogComposeComp = () => {

    const handleLineEnter = (index: number) => {
        setContentStructure(prevStructure => {
            const newLine: BlogContent = { type: "p", index: index + 1, text: "", focus: true };

            prevStructure.forEach((line) => {
                if (line.index >= index + 1) {
                    line.index = line.index + 1;
                }
                line.focus = false;
            });
            prevStructure.push(newLine);

            return [...prevStructure];
        });
    };

    const blogContent: BlogContent[] = [
        { type: "p", index: 1, text: "Hi" },
        { type: "h4", index: 2, text: "Hello" }
    ]

    const [ contentStructure, setContentStructure ] = useState<BlogContent[]>(blogContent);

    const handleTextChange = (index: number, text: string) => {
        setContentStructure(prevContentStructure => {
            return prevContentStructure.map(content => {
                if(content.index === index) {
                    content.text = text;
                }
                return content;
            });
        });
    }

    const content = contentStructure && contentStructure.sort((a, b) => a.index - b.index).map((line) => {
                        if (line.type === "p") {
                            return (
                                <ParaLine
                                    key={line.index}
                                    index={line.index}
                                    text={line.text}
                                    onEnterCallback={handleLineEnter}
                                    focus={line.focus || false}
                                    onTextChange={handleTextChange}
                                />
                            );
                        } else if (line.type === "h4") {
                            return (
                                <H4Line
                                    key={line.index}
                                    index={line.index}
                                    text={line.text}
                                    onEnterCallback={handleLineEnter}
                                    focus={line.focus || false}
                                    onTextChange={handleTextChange}
                                />
                            );
                        }
                        return null;
                    });

    return (
        <div className={`${styles.composeContainer} x-axis-flex`}>
            <div className={`${styles.composeBar} y-axis-flex`}>
                <span>
                    <FontAwesomeIcon icon={faImage} />
                </span>
            </div>
            <div className={`${styles.composeArea}`}>
                { content }
            </div>
        </div>
    )
}

export default BlogComposeComp;