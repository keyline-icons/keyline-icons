import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TestTubeDiagonal({ size = 24, ...props }: IconProps) {
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
      <path d="M14.6796 1.7076L19.7076 4.9815C19.991 5.1661 20.162 5.4814 20.162 5.8195C20.162 6.0133 20.1057 6.2028 20 6.3652L10.3521 21.1826C9.6139 22.3162 8.3528 23 7 23C4.7909 23 3 21.2091 3 19C3 18.2251 3.2251 17.4668 3.6479 16.8174L13.2959 2C13.4804 1.7166 13.7957 1.5456 14.1339 1.5456C14.3276 1.5456 14.5172 1.6019 14.6796 1.7076ZM14.4263 3.9293L9.1713 12L13.9445 12L17.7783 6.1119L14.4263 3.9293Z" fill="currentColor" stroke="none"/>
      <path d="M13.0471 1.838L20.4544 6.661" fill="none"/>
    </svg>
  )
}
