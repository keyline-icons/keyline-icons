import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CopyOff({ size = 24, ...props }: IconProps) {
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
      <path d="M21.8284 21.8284C21.0789 22.5794 20.0611 23.001 19 23L11 23C8.7909 23 7 21.2091 7 19L7 11C6.999 9.9389 7.4206 8.9211 8.1716 8.1716L21.8284 21.8284ZM12.9498 8.7071C12.7621 8.5196 12.6567 8.2651 12.6567 7.9998C12.6567 7.4475 13.1046 6.9998 13.6569 7L19 7C21.2091 7 23 8.7909 23 11L23 16.3431C23.0002 16.8954 22.5525 17.3433 22.0002 17.3433C21.7349 17.3433 21.4804 17.2379 21.2929 17.0502L12.9498 8.7071Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M2.8787 2.8787C2.3358 3.4216 2 4.1716 2 5L2 13C2 14.2714 2.8015 15.4046 4 15.8284M15.8284 4C15.4046 2.8015 14.2714 2 13 2L7.6569 2M2 2L22 22" fill="none"/>
    </svg>
  )
}
