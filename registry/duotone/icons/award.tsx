import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Award({ size = 24, ...props }: IconProps) {
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
      <path d="M16.1787 14.6152L17.8979 19.9259C18.3406 21.1947 17.2603 22.4552 16.2597 21.8373L12.5365 19.5384C12.1988 19.3298 11.8012 19.3298 11.4635 19.5384L7.7403 21.8373C6.7397 22.4552 5.6594 21.1947 6.1021 19.9259L7.8213 14.6152" strokeOpacity="0.4"/>
      <path d="M12 1C16.4183 1 20 4.58172 20 9C20 13.4183 16.4183 17 12 17C7.58172 17 4 13.4183 4 9C4 4.58172 7.58172 1 12 1Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
