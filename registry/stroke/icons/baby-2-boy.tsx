import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Baby2Boy({ size = 24, ...props }: IconProps) {
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
      <path d="M4 10.5C4 5.8 7.6 2 12 2C16.4 2 20 5.8 20 10.5C21.1046 10.5 22 11.6193 22 13C22 14.3807 21.1046 15.5 20 15.5L20 15.738C20 17.3 19 18.9 17.45 20.1C15.9 21.3 13.94 22 12 22C10.06 22 8.1 21.3 6.55 20.1C5 18.9 4 17.3 4 15.738L4 15.5C2.8954 15.5 2 14.3807 2 13C2 11.6193 2.8954 10.5 4 10.5ZM12 2C10.8 2.3 9.1 3.2742 9.1 5.5C9.1 7.2121 10.4879 8.6 12.2 8.6C13.1163 8.6 13.9857 8.1946 14.5747 7.4926M9 12.6L9 13.6M15 12.6L15 13.6M14 19C14 17.8954 13.1046 17 12 17C10.8954 17 10 17.8954 10 19C10 20.1046 10.8954 21 12 21C13.1046 21 14 20.1046 14 19Z" fill="none"/>
    </svg>
  )
}
