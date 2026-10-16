import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function InputCursor({ size = 24, ...props }: IconProps) {
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
      <path d="M21 7L2 7L2 17L13 17" fill="none" strokeOpacity="0.4"/>
      <path d="M6 10L6 14" fill="none"/>
      <path d="M17.0074 17.3215L14.925 11.1884C14.8898 11.0849 14.8719 10.9763 14.8719 10.8669C14.8719 10.3146 15.3196 9.8669 15.8719 9.8669C15.9863 9.8669 16.0999 9.8865 16.2077 9.925L22.3358 12.1095C22.7341 12.2514 23 12.6286 23 13.0514C23 13.4347 22.7809 13.7843 22.4358 13.9514L20.1351 15.0656L18.8342 17.4751C18.6597 17.7984 18.3218 18 17.9543 18C17.5259 18 17.1451 17.7271 17.0074 17.3215Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
