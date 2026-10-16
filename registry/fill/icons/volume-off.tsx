import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function VolumeOff({ size = 24, ...props }: IconProps) {
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
      <path d="M12 12L12 18.9962C12 20.9544 9.4772 21.746 8.3585 20.1388L5.4777 16L3 16C1.8954 16 1 15.1046 1 14L1 10C1 8.8954 1.8954 8 3 8L5.4777 8L6.5128 6.5128Z" fill="currentColor" stroke="none"/>
      <path d="M15.8044 6.9091C17.2058 8.2316 18 10.0732 18 12C18 12.112 17.9973 12.2238 17.992 12.3351M18.5498 4C20.7519 6.0782 22 8.9721 22 12C22 13.2746 21.7788 14.5254 21.3585 15.7016M2 2L22 22"/>
    </svg>
  )
}
