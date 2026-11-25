import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function MathSymbols({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M6 3L6 9M3 6L9 6M15 6L21 6M3 14.3333L9 20.3333M9 14.3333L3 20.3333M15 17.3333L21 17.3333"/>
      <path d="M19.3333 14C19.3333 14.7364 18.7364 15.3333 18 15.3333C17.2636 15.3333 16.6667 14.7364 16.6667 14C16.6667 13.2636 17.2636 12.6667 18 12.6667C18.7364 12.6667 19.3333 13.2636 19.3333 14ZM19.3333 20.6667C19.3333 21.4031 18.7364 22 18 22C17.2636 22 16.6667 21.4031 16.6667 20.6667C16.6667 19.9303 17.2636 19.3334 18 19.3334C18.7364 19.3334 19.3333 19.9303 19.3333 20.6667Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
