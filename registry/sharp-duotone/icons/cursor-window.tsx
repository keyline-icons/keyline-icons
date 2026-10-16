import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CursorWindow({ size = 24, ...props }: IconProps) {
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
      <path d="M10 20H3V3H20V10M6 7H10" strokeOpacity="0.4"/>
      <path d="M9.84768 9.81429C10.1219 9.5446 10.5269 9.45623 10.8887 9.58675L21.3399 13.3582C21.7161 13.4942 21.9748 13.8417 21.9981 14.2411C22.0212 14.6405 21.8043 15.0156 21.4463 15.1942L17.377 17.2205L15.0176 21.4832C14.8261 21.8289 14.4484 22.0295 14.0547 21.995C13.6613 21.9602 13.3246 21.6976 13.1963 21.3241L9.60257 10.8514C9.47793 10.4876 9.57368 10.0841 9.84768 9.81429Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
