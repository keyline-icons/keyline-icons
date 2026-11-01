import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Sunset2({ size = 24, ...props }: IconProps) {
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
      <path d="M2 14.5C2.9123 13.5421 4.1772 13 5.5 13C6.8228 13 8.0877 13.5421 9 14.5C9.9123 15.4579 11.1772 16 12.5 16C13.8228 16 15.0877 15.4579 16 14.5C16.9123 13.5421 18.1772 13 19.5 13C20.4 13 21.3 13.25 22 13.7M2 19.5C2.9123 18.5421 4.1772 18 5.5 18C6.8228 18 8.0877 18.5421 9 19.5C9.9123 20.4579 11.1772 21 12.5 21C13.8228 21 15.0877 20.4579 16 19.5C16.9123 18.5421 18.1772 18 19.5 18C20.4 18 21.3 18.25 22 18.7" fill="none" strokeOpacity="0.4"/>
      <path d="M3.0195 10.4031C3.3267 5.7108 7.23 2 12 2C16.6789 2 20.5239 5.5704 20.959 10.1354C20.4792 10.0447 19.992 9.9991 19.5037 9.9991C17.3587 9.9991 15.3073 10.878 13.8276 12.431C13.4816 12.7944 13.0017 13 12.5 13C11.9983 13 11.5184 12.7944 11.1724 12.431C9.6939 10.8786 7.6438 10 5.5 10C4.6569 10 3.8192 10.1361 3.0195 10.4031Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
