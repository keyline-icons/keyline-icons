import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Store({ size = 24, ...props }: IconProps) {
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
      <path d="M1 7.5L1 6.362C1 5.8942 1.164 5.4411 1.4636 5.0817L3.4319 2.7196C3.8119 2.2636 4.3748 2 4.9684 2L19.0316 2C19.6252 2 20.1881 2.2636 20.5681 2.7196L22.5364 5.0817C22.836 5.4411 23 5.8942 23 6.362L23 7.5C23 8.8519 22.2214 10.0829 21 10.6623L21 19C21 20.6569 19.6569 22 18 22L6 22C4.3431 22 3 20.6569 3 19L3 10.6623C1.7786 10.0829 1 8.8519 1 7.5Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M19.5 10C18.8281 10 18.1845 9.7296 17.7143 9.2496C17.5262 9.0577 17.2688 8.9495 17 8.9495C16.7312 8.9495 16.4738 9.0577 16.2857 9.2496C15.8155 9.7296 15.1719 10 14.5 10C13.8281 10 13.1845 9.7296 12.7143 9.2496C12.5262 9.0577 12.2688 8.9495 12 8.9495C11.7312 8.9495 11.4738 9.0577 11.2857 9.2496C10.8155 9.7296 10.1719 10 9.5 10C8.8281 10 8.1845 9.7296 7.7143 9.2496C7.5262 9.0577 7.2688 8.9495 7 8.9495C6.7312 8.9495 6.4738 9.0577 6.2857 9.2496C5.8155 9.7296 5.1719 10 4.5 10M9 21L9 15C9 14.4477 9.4477 14 10 14L14 14C14.5523 14 15 14.4477 15 15L15 21M7 8.9495L7 6.362M12 8.9495L12 6.362M17 8.9495L17 6.362"/>
    </svg>
  )
}
