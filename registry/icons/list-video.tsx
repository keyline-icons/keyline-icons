import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ListVideo({ size = 24, ...props }: IconProps) {
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
      <path d="M2 6H16M2 12H12M2 18H12M17.59977 10.20164L21.59977 13.19983C22.13341 13.59982 22.13341 14.40018 21.59977 14.80017L17.59977 17.79836C16.94049 18.29251 16 17.8221 16 16.99818L16 11.00182C16 10.1779 16.94049 9.70749 17.59977 10.20164Z"/>
    </svg>
  )
}
