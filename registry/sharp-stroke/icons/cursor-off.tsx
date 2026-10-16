import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CursorOff({ size = 24, ...props }: IconProps) {
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
      <path d="M7.2925 7.2925L2 9.1543L10.7742 12.919L15.1372 22L16.8479 16.8479L7.2925 7.2925ZM17.9107 13.5099L18.214 12.5572L21.3839 2.601L11.5364 5.8795L10.5877 6.1957M1.7071 1.7071L22.2929 22.2929"/>
    </svg>
  )
}
