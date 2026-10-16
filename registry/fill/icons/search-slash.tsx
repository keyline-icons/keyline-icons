import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SearchSlash({ size = 24, ...props }: IconProps) {
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
      <path d="M18 10C18 14.4183 14.4183 18 10 18C5.5817 18 2 14.4183 2 10C2 5.5817 5.5817 2 10 2C14.4183 2 18 5.5817 18 10ZM12.8284 8.5858C13.0159 8.3983 13.1213 8.1439 13.1213 7.8787C13.1213 7.3264 12.6736 6.8787 12.1213 6.8787C11.8561 6.8787 11.6017 6.9841 11.4142 7.1716L7.1716 11.4142C6.9841 11.6017 6.8787 11.8561 6.8787 12.1213C6.8787 12.6736 7.3264 13.1213 7.8787 13.1213C8.1439 13.1213 8.3983 13.0159 8.5858 12.8284L12.8284 8.5858Z" fill="currentColor" stroke="none"/>
      <path d="M15 15L21 21" fill="none"/>
    </svg>
  )
}
