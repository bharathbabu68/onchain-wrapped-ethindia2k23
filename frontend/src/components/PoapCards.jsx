import React from 'react';
import { Card, Button } from 'react-bootstrap';

const PoapCards = ({ poapEvents }) => {
  return (
    <div className="d-flex flex-wrap">
      {poapEvents.map((event) => (
        <Card key={event.eventId} style={{ width: '18rem', margin: '10px', padding:"1%", textAlign:"center"}}>
          <Card.Img style={{width:"50%", height:"50%", marginLeft:"25%"}} variant="top" src={event?.poapEvent?.contentValue?.image?.small} />
          <Card.Body>
            <Card.Title>{event.poapEvent.eventName}</Card.Title>
            <Card.Text>
              {`Start Date: ${new Date(event.poapEvent.startDate).toLocaleDateString()}`}<br />
              {`End Date: ${new Date(event.poapEvent.endDate).toLocaleDateString()}`}<br />
              {`Location: ${event.poapEvent.city}, ${event.poapEvent.country}`}
            </Card.Text>
            <Button variant="primary" href={event.poapEvent.eventURL} target="_blank">Event Details</Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default PoapCards;
