import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Handbag({ size = 24, ...props }: IconProps) {
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
      <path d="M8 7C8 4.790861 9.790861 3 12 3C14.209139 3 16 4.790861 16 7M7 7L17 7C18.656854 7 20 8.343146 20 10L20 18C20 19.656854 18.656854 21 17 21L7 21C5.343146 21 4 19.656854 4 18L4 10C4 8.343146 5.343146 7 7 7Z"/>
    </svg>
  )
}
