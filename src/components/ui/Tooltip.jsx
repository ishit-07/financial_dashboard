import { useState, useRef, useEffect } from 'react'

export default function Tooltip({ children, content, position = 'top' }) {
  const [show, setShow] = useState(false)
  const ref = useRef(null)

  const positions = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  }

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      ref={ref}
    >
      {children}
      {show && (
        <div
          className={`absolute z-50 px-2.5 py-1.5 text-xs font-medium text-white bg-gray-900 rounded-lg whitespace-nowrap pointer-events-none ${positions[position]}`}
          style={{ animation: 'fadeIn 100ms ease-out' }}
        >
          {content}
        </div>
      )}
    </div>
  )
}
