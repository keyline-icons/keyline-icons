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
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M15.5176 2.2533L18.8696 4.4359C19.4364 4.805 19.7783 5.4355 19.7783 6.1119C19.7783 6.4994 19.6658 6.8785 19.4544 7.2032L10.3521 21.1826C9.6139 22.3162 8.3528 23 7 23C4.7909 23 3 21.2091 3 19C3 18.2251 3.2251 17.4668 3.6479 16.8174L12.7502 2.838C13.1193 2.2712 13.7499 1.9293 14.4263 1.9293C14.8137 1.9293 15.1929 2.0419 15.5176 2.2533ZM14.4263 3.9293L9.1713 12L13.9445 12L17.7783 6.1119L14.4263 3.9293Z" fill="currentColor" stroke="none"/>
      <path d="M13.2959 2L20 6.3652" fill="none"/>
    </svg>
  )
}
