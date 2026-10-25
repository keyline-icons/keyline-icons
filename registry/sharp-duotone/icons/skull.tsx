import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Skull({ size = 24, ...props }: IconProps) {
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
      <path d="M5 18.1414C3.0812 16.2606 2 13.6868 2 11C2 5.4772 6.4772 1 12 1C17.5228 1 22 5.4772 22 11C22 13.6868 20.9188 16.2606 19 18.1414L19 22C19 22.5523 18.5523 23 18 23L6 23C5.4477 23 5 22.5523 5 22L5 18.1414Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M10 22L10 19M14 22L14 19M10.4562 16.47L12 14L13.5438 16.47" fill="none"/>
      <path d="M10 11C10 11.8284 9.3284 12.5 8.5 12.5C7.6716 12.5 7 11.8284 7 11C7 10.1716 7.6716 9.5 8.5 9.5C9.3284 9.5 10 10.1716 10 11ZM17 11C17 11.8284 16.3284 12.5 15.5 12.5C14.6716 12.5 14 11.8284 14 11C14 10.1716 14.6716 9.5 15.5 9.5C16.3284 9.5 17 10.1716 17 11Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
