import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CloudSync({ size = 24, ...props }: IconProps) {
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
      <path d="M15.3812 4.0071L14.8582 3.7232C14.0085 3.262 13.0348 3 12 3C8.6863 3 6 5.6863 6 9C3.7909 9 2 10.7909 2 13C2 15.2091 3.7909 17 6 17L8.1186 17" strokeOpacity="0.4"/>
      <path d="M21.7707 13.7185L21.9164 14.5449C21.972 14.8603 22 15.1798 22 15.5C22 18.5376 19.5376 21 16.5 21C13.4624 21 11 18.5376 11 15.5C11 12.4624 13.4624 10 16.5 10C16.8202 10 17.1397 10.028 17.4551 10.0836M15.4357 7.1997L15.7343 7.6261L17.4551 10.0836L14.9976 11.8043L14.5712 12.1029"/>
    </svg>
  )
}
