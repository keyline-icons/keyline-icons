import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CirclePoundSterling({ size = 24, ...props }: IconProps) {
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
      <path d="M12 1C17.9372 1 23 6.0628 23 12C23 17.9372 17.9372 23 12 23C6.0628 23 1 17.9372 1 12C1 6.0628 6.0628 1 12 1ZM9 17L7.5 17L7.5 19L9 19L11 19L16.5 19L16.5 17L11 17L11 15L15 15L15 13L11 13L11 8C11 7.4477 11.4477 7 12 7C12.5523 7 13 7.4477 13 8C13 8.1755 12.9538 8.348 12.866 8.5L12.5774 9L14.3094 10L14.5981 9.5C14.8614 9.0439 15 8.5266 15 8C15 6.3431 13.6569 5 12 5C10.3431 5 9 6.3431 9 8L9 13L7.5 13L7.5 15L9 15L9 17Z" fill="currentColor"/>
    </svg>
  )
}
