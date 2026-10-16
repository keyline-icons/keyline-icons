import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Headset({ size = 24, ...props }: IconProps) {
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
      <path d="M3 10C3 8.343146 4.343146 7 6 7L6 7C7.656854 7 9 8.343146 9 10L9 16C9 17.656854 7.656854 19 6 19L6 19C4.343146 19 3 17.656854 3 16ZM15 10C15 8.343146 16.343146 7 18 7L18 7C19.656854 7 21 8.343146 21 10L21 16C21 17.656854 19.656854 19 18 19L18 19C16.343146 19 15 17.656854 15 16Z" fill="currentColor" stroke="none"/>
      <path d="M4 10C4 5.5817 7.5817 2 12 2C16.4183 2 20 5.5817 20 10M18 18C18 20.2091 16.2091 22 14 22L12 22" strokeOpacity="0.4"/>
    </svg>
  )
}
