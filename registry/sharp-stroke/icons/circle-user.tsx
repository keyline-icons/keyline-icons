import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CircleUser({ size = 24, ...props }: IconProps) {
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
      <path d="M12 7C13.1046 7 14 7.8954 14 9C14 10.1046 13.1046 11 12 11C10.8954 11 10 10.1046 10 9C10 7.8954 10.8954 7 12 7ZM17 20.6603L17 19C17 16.7909 15.2091 15 13 15L11 15C8.7909 15 7 16.7909 7 19L7 20.6603"/>
      <path d="M12 2C17.5228 2 22 6.4771 22 12C22 17.5228 17.5228 22 12 22C6.4771 22 2 17.5228 2 12C2 6.4771 6.4771 2 12 2Z"/>
    </svg>
  )
}
