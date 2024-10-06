import { PrinterIcon } from "@heroicons/react/24/outline";
import React, { useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import { Button } from "../ui";
import ComponentToPrint from "./ComponentToPrint";

function Print({ empLogs, holidays, datesInMonth, employee_id, month, year }) {
  const componentRef = useRef();
  const [display, setDisplay] = useState("none");
  const toggleDisplay = () => {
    if (display == "none") setDisplay("block");
    else {
      setDisplay("none");
    }
  };
  return (
    <div>
      <ReactToPrint
        trigger={() => (
          <div className="mt-1">
            <Button type="button" variant="primary">
              <PrinterIcon className="-ml-0.5 mr-2 h-5 w-5" /> Print DTR
            </Button>
          </div>
        )}
        content={() => componentRef.current}
      />
      <div style={{ position: "absolute", display: `${display}` }}>
        <ComponentToPrint
          ref={componentRef}
          empLogs={empLogs}
          holidays={holidays}
          datesInMonth={datesInMonth}
          employee_id={employee_id}
          month={month}
          year={year}
        />
      </div>
    </div>
  );
}
export default Print;
