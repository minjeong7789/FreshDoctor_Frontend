export function Logo() {
  return (
    <div className="brand" aria-label="FreshDoctor">
      <span className="brand__mark" aria-hidden="true">
        <svg viewBox="0 0 32 32" fill="none">
          <path className="brand__leaf brand__leaf--left" d="M15.5 17.2C10.1 17.4 6.6 14.5 6.2 8.4c5.6-.8 9.3 2 9.3 8.8Z" />
          <path className="brand__leaf brand__leaf--right" d="M16.5 17.2c5.4.2 8.9-2.7 9.3-8.8-5.6-.8-9.3 2-9.3 8.8Z" />
          <path className="brand__stem" d="M16 14.5V25" />
          <path className="brand__cross" d="M16 4.5v6M13 7.5h6" />
        </svg>
      </span>
      <span>
        <strong className="brand__word">프레시닥터</strong>
        <small className="brand__sub">FreshDoctor</small>
      </span>
    </div>
  )
}
