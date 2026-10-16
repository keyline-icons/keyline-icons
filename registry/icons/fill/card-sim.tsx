import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CardSim({ size = 24, ...props }: IconProps) {
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
      <path d="M4 4C4 2.3431 5.3431 1 7 1L13.1716 1C13.9672 1 14.7303 1.3161 15.2929 1.8787L19.1213 5.7071C19.6839 6.2697 20 7.0328 20 7.8284L20 20C20 21.6569 18.6569 23 17 23L7 23C5.3431 23 4 21.6569 4 20L4 4ZM8 13L8 17C8 18.1046 8.8954 19 10 19L14 19C15.1046 19 16 18.1046 16 17L16 13C16 11.8954 15.1046 11 14 11L10 11C8.8954 11 8 11.8954 8 13ZM10 13L14 13L14 17L10 17L10 13Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
