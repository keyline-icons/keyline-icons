import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BotDroplet({ size = 24, ...props }: IconProps) {
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
      <path d="M17.7728 8.4615C19.202 9.9512 20 11.9356 20 14C20 18.4183 16.4183 22 12 22C7.5817 22 4 18.4183 4 14C4 11.9356 4.798 9.9512 6.2272 8.4615L12 2.4444L17.7728 8.4615Z" strokeLinejoin="miter"/>
      <path d="M9.8705 10.7535L10.5816 15.4178M13.8248 10.1507L14.5359 14.815"/>
    </svg>
  )
}
