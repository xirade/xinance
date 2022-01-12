export default function Loader({ classNames, darkMode }) {
  return (
    <svg className={classNames} viewBox="0 0 38 38">
      <defs>
        <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">
          <stop
            stopColor={`${darkMode ? "rgb(30 41 59)" : "rgb(254 252 232)"}`}
            stopOpacity="0"
            offset="0%"
          />
          <stop
            stopColor={`${darkMode ? "rgb(30 41 59)" : "rgb(254 252 232)"}`}
            stopOpacity=".631"
            offset="63.146%"
          />
          <stop
            stopColor={`${darkMode ? "rgb(30 41 59)" : "rgb(254 252 232)"}`}
            offset="100%"
          />
        </linearGradient>
      </defs>
      <g fill="none" fillRule="evenodd">
        <g transform="translate(1 1)">
          <path
            d="M36 18c0-9.94-8.06-18-18-18"
            id="Oval-2"
            stroke="url(#a)"
            strokeWidth="2"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="0.9s"
              repeatCount="indefinite"
            />
          </path>
          <circle
            fill={`${darkMode ? "rgb(30 41 59)" : "rgb(254 252 232)"}`}
            cx="34"
            cy="18"
            r="1"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="0.9s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      </g>
    </svg>
  );
}
