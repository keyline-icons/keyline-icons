import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Underwear({ size = 24, ...props }: IconProps) {
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
      <path d="M12 4L21 4C22.1046 4 23 4.8954 23 6L23 9.2792C23 10.1399 22.4492 10.9044 21.6324 11.1766L18.3178 12.2815C17.3784 12.5946 16.654 13.3512 16.3819 14.3034L15.1687 18.5494C14.9235 19.408 14.1387 20 13.2457 20L10.7543 20C9.8613 20 9.0765 19.408 8.8312 18.5493L7.6181 14.3034C7.346 13.3512 6.6216 12.5946 5.6822 12.2815L2.3676 11.1766C1.5508 10.9044 1 10.1399 1 9.2792L1 6C1 4.8954 1.8954 4 3 4Z" fill="currentColor"/>
    </svg>
  )
}
