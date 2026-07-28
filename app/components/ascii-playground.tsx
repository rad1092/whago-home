"use client";

import { useState } from "react";

const initialDiagram = `┌──────────────────┐
│  ASCII DIAGRAM   │
└────────┬─────────┘
         │
   ┌─────▼─────┐
   │   <pre>   │
   └───────────┘`;

export default function AsciiPlayground() {
  const [diagram, setDiagram] = useState(initialDiagram);

  return (
    <div className="ascii-playground">
      <header>
        <div>
          <strong>직접 바꿔보세요.</strong>
          <span>왼쪽 입력이 오른쪽 &lt;pre&gt; 출력에 바로 반영됩니다.</span>
        </div>
        <button
          type="button"
          onClick={() => setDiagram(initialDiagram)}
          disabled={diagram === initialDiagram}
        >
          초기화
        </button>
      </header>
      <div className="ascii-workspace">
        <label>
          <span>텍스트 입력</span>
          <textarea
            value={diagram}
            onChange={(event) => setDiagram(event.target.value)}
            spellCheck={false}
            rows={7}
          />
        </label>
        <div className="ascii-output">
          <span>실제 &lt;pre&gt; 출력</span>
          <pre>{diagram}</pre>
        </div>
      </div>
    </div>
  );
}
