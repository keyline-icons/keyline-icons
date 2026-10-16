import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CirclePercent({ size = 24, ...props }: IconProps) {
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
      <path d="M12 1C18.0753 1 23 5.9247 23 12C23 18.0753 18.0753 23 12 23C5.9247 23 1 18.0753 1 12C1 5.9247 5.9247 1 12 1Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2Z"/>
      <path d="M8.5 7C9.3285 7 10 7.6716 10 8.5C10 9.3285 9.3285 10 8.5 10C7.6716 10 7 9.3285 7 8.5C7 7.6716 7.6716 7 8.5 7ZM15.5 14C16.3285 14 17 14.6716 17 15.5C17 16.3285 16.3285 17 15.5 17C14.6716 17 14 16.3285 14 15.5C14 14.6716 14.6716 14 15.5 14Z" fill="currentColor" stroke="none"/>
      <path d="M8 16L16 8"/>
    </svg>
  )
}
