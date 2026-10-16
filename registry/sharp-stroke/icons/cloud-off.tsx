import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CloudOff({ size = 24, ...props }: IconProps) {
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
      <path d="M7.2868 7.2868C6.4809 8.3082 6 9.5979 6 11C3.7909 11 2 12.7909 2 15C2 17.2091 3.7909 19 6 19L19 19M21.5344 17.1259L21.8263 16.1695C21.9392 15.7996 22 15.4069 22 15C22 12.7909 20.2091 11 18 11C18 7.6863 15.3137 5 12 5C11.5823 5 11.1745 5.0427 10.7808 5.124L9.8015 5.3262M1.7071 1.7071L22.2929 22.2929"/>
    </svg>
  )
}
