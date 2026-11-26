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
      <path d="M10 2C12.2092 2 14 3.7908 14 6H15C16.6569 6 18 7.3431 18 9V10C20.2092 10 22 11.7908 22 14C22 16.2092 20.2092 18 18 18V19C18 20.6569 16.6569 22 15 22H5C3.3431 22 2 20.6569 2 19V17.5C2 16.6716 2.6716 16 3.5 16H4C5.1046 16 6 15.1046 6 14C6 12.8954 5.1046 12 4 12H3.5C2.6716 12 2 11.3284 2 10.5V9C2 7.3431 3.3431 6 5 6H6C6 3.7908 7.7908 2 10 2Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M9.382 22L10.1056 20.5528L11.846 17.0718L10.1679 14.5547C9.944 14.2188 9.944 13.7812 10.1679 13.4453L12.1679 10.4453C12.4743 9.9858 13.0952 9.8616 13.5547 10.1679C14.0142 10.4743 14.1384 11.0952 13.8321 11.5547L12.2019 14L13.8321 16.4453C14.0311 16.7439 14.0549 17.1262 13.8944 17.4472L11.8944 21.4472L11.618 22H9.382Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
