import {Accordion, Card, Row, Col, Button, Image} from "react-bootstrap";
import React, { useState, useEffect, useRef } from 'react';
import useCampaigns from '../hooks/useCampaigns';

function GameWindow({ Game, responseLoading }) {

    const endOfCard = useRef(null);

    useEffect(() => {
        endOfCard.current?.scrollIntoView({ behavior: 'smooth' });
    }, [Game]);
    
    return (
        <>
            {Game.log.map((entry, index) => (
                <Row key={index} className="mt-4 mx-auto">
                    {entry.role != 'system' ? <Col md={11}>
                        <div className="d-flex align-items-start">
                            {entry.role === 'assistant' ? <Image src="/Flame.gif" alt="Assistant" width={55} roundedCircle /> : null}
                            <h1 style={{ fontSize: '1.2rem', textAlign: 'left' }} className="mt-3 ms-2">{entry.content}</h1>
                        </div>
                        {entry.role === 'assistant' ? <hr className="my-4" /> : null}
                    </Col> : null}
                </Row>
            ))}
            {responseLoading ? <Image src="/loading.gif" alt="Loading..." width={55} height={55}/> : null}
            <div ref={endOfCard} />
        </>
    );
}
export default GameWindow;