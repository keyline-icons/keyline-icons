import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function GitRefresh({ size = 24, ...props }: IconProps) {
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
      <path d="M6 21V9M18 13V10C18 7.79086 16.2091 6 14 6H13M13.5 17.5H17.5C19.433 17.5 21 19.067 21 21M14.5 15.5L12.8536 17.1464C12.6583 17.3417 12.6583 17.6583 12.8536 17.8536L14.5 19.5"/>
      <path d="M10 6C10 8.20914 8.20914 10 6 10C3.79086 10 2 8.20914 2 6C2 3.79086 3.79086 2 6 2C8.20914 2 10 3.79086 10 6Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
