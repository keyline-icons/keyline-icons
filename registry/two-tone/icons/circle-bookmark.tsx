import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CircleBookmark({ size = 24, ...props }: IconProps) {
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
      <path d="M23 12C23 18.075 18.075 23 12 23C5.925 23 1 18.075 1 12C1 5.925 5.925 1 12 1C18.075 1 23 5.925 23 12Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2Z"/>
      <path d="M8.129 8.613C8.129 7.812 8.779 7.162 9.581 7.162H14.419C15.221 7.162 15.871 7.812 15.871 8.613V16.354C15.871 16.737 15.447 16.968 15.125 16.761L12.392 15.315C12.153 15.161 11.847 15.161 11.608 15.315L8.875 16.761C8.553 16.968 8.129 16.737 8.129 16.354V8.613Z"/>
    </svg>
  )
}
