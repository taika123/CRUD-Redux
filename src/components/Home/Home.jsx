import React from "react";
import { Comics } from "comics-api";
function Home() {
  return (
    <div>
      - onClick Props: <br /> onClick is another props restricted to CSVLink. If
      it is defined, it means 3 things: <br />1 - It will run at the top of the
      click handling logic. <br />2 - [Sync] If it returns an explicit false,
      the return will be interpreted as a claim to stop the click handling,
      then, the next logic will not be executed if so. <br />3 - [Async] If it
      is async, "done" argument must be called if you want to invoke the
      handling of the component. (check examples below) <br />4 - [Async] If it
      is async (includes api call, timeout,... ) and it calls done with false
      will be interpreted as a claim to stop the click handling, then, the next
      logic will not be executed if so. examples <br />
      🔬 Sync + Proceed <br />
      1. CSVLink Component: It renders a hyperlink and clicking on it will
      trigger the download action of the CSV document. It does not accept only
      data and headers props, but it also renders all props of HTMLAnchor tag.
      (className, target,....) - filename Props: filename is another props
      restricted to CSVLink. It specifies the filename of the downloaded CSV.
      example
    </div>
  );
}

export default Home;
