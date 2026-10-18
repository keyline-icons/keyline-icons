import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BookOpen2({ size = 24, ...props }: IconProps) {
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
      <path d="M7 6L3 6L3 19.0235C3.3331 19.0078 3.6665 19 4 19C7.1102 19 10.1825 19.6827 13 21C14.731 19.7018 16.8363 19 19 19C19.6718 19 20.3418 19.0677 21 19.202L21 4.9336C20.7451 4.914 20.4896 4.9042 20.234 4.9042C17.501 4.9042 14.887 6.0229 13 8C12.0047 5.404 9.733 3.5108 7 3L7 16.101C7.3291 16.0338 7.6641 16 8 16C10.7614 16 13 18.2386 13 21M13 8L13 21" fill="none"/>
    </svg>
  )
}
