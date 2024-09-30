import React from "react";
import CardHeadings from "../../../components/CardHeadings";

export default function Holidays() {
  return (
    <>
      <CardHeadings
        title="Holidays"
        buttonLinkLabel="Create new holiday"
        redirectTo="/holidays/create"
      />
      <div className="bg-white rounded-md">
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil
          reiciendis aperiam placeat molestias rem amet! Laudantium, voluptates
          ea possimus cum similique ad laborum blanditiis, atque asperiores
          tempora quam maiores repellendus.
        </p>
      </div>
    </>
  );
}
