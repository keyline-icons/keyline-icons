import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Gift({ size = 24, ...props }: IconProps) {
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
      <path d="M1 8C1 6.895431 1.895431 6 3 6L21 6C22.104569 6 23 6.895431 23 8L23 10C23 11.104569 22.104569 12 21 12L21 12L21 19C21 21.209139 19.209139 23 17 23L7 23C4.790861 23 3 21.209139 3 19L3 12L3 12C1.895431 12 1 11.104569 1 10Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M1 10L23 10C23 11.104569 22.104569 12 21 12L3 12C1.895431 12 1 11.104569 1 10Z" fill="currentColor" stroke="none"/>
      <path d="M12 7C9 7 7 6 7 4.5C7 3.1193 8.1193 2 9.5 2C11.5 2 12 5 12 7ZM12 7C15 7 17 6 17 4.5C17 3.1193 15.8807 2 14.5 2C12.5 2 12 5 12 7Z"/>
    </svg>
  )
}
