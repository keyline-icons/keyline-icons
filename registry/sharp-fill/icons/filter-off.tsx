import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FilterOff({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M13 20.618L10.4472 21.8944C9.7823 22.2269 9 21.7434 9 21L9 14.6569L11 14.6569L13 16.6569L13 13.0001L15 15.0001L15 19.0001C15 19.3789 14.786 19.7251 14.4472 19.8945ZM5.6569 2L21 2C21.8451 2 22.3092 2.9833 21.7719 3.6357L15.2329 11.576Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M1.7071 1.7071L22.2929 22.2929"/>
    </svg>
  )
}
