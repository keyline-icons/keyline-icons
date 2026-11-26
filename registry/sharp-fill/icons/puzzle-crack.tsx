import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function PuzzleCrack({ size = 24, ...props }: IconProps) {
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
      <path d="M9.382 22L3 22C2.4477 22 2 21.5523 2 21L2 17C2 16.4477 2.4477 16 3 16L4 16C5.1046 16 6 15.1046 6 14C6 12.8954 5.1046 12 4 12L3 12C2.4477 12 2 11.5523 2 11L2 7C2 6.4477 2.4477 6 3 6L6 6C6 3.7908 7.7908 2 10 2C12.2092 2 14 3.7908 14 6L17 6C17.5523 6 18 6.4477 18 7L18 10C20.2092 10 22 11.7908 22 14C22 16.2092 20.2092 18 18 18L18 21C18 21.5523 17.5523 22 17 22L11.618 22L11.8944 21.4472L13.8944 17.4472C14.0549 17.1262 14.0311 16.7439 13.8321 16.4453L12.2019 14L14.1289 11.1094L12.4649 10L10.168 13.4453C9.944 13.7812 9.944 14.2188 10.1679 14.5547L11.846 17.0718L10.1056 20.5528Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
