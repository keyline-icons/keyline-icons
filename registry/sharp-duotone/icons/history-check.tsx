import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function HistoryCheck({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M6.817 3.04C7.072 3.11 7.288 3.28 7.417 3.51C7.546 3.74 7.577 4.02 7.505 4.27L6.301 8.5L4.377 7.95L4.734 6.69C3.644 8.18 3 10.02 3 12C3 16.97 7.029 21 12 21H13V23H12C5.925 23 1 18.08 1 12C1 9.02 2.184 6.32 4.104 4.34L2.046 3.76L2.595 1.83L6.817 3.04Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M12 1C18.075 1 23 5.92 23 12V13H21V12C21 7.03 16.971 3 12 3C11.696 3 11.395 3.02 11.099 3.04L10.197 3.13L10 1.14L10.901 1.05C11.263 1.02 11.63 1 12 1ZM13 11H18V13H12C11.448 13 11 12.55 11 12V5H13V11ZM23 17.41L18.707 21.71C18.317 22.1 17.683 22.1 17.293 21.71L15 19.41L16.414 18L18 19.59L21.586 16L23 17.41Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
