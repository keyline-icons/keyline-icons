import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function PlayPause({ size = 24, ...props }: IconProps) {
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
      <path d="M2 7.5C2 6.6716 2.6716 6 3.5 6C3.8011 6 4.0951 6.0906 4.344 6.26L11.5626 11.1733C11.8362 11.3595 12 11.6691 12 12C12 12.3309 11.8362 12.6405 11.5626 12.8267L4.344 17.74C4.0951 17.9094 3.8011 18 3.5 18C2.6716 18 2 17.3284 2 16.5L2 7.5ZM17 6L17 18M22 6L22 18" fill="none"/>
    </svg>
  )
}
