import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CircleMoreHorizontal({ size = 24, ...props }: IconProps) {
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
      <path d="M12 2C17.5228 2 22 6.4771 22 12C22 17.5228 17.5228 22 12 22C6.4771 22 2 17.5228 2 12C2 6.4771 6.4771 2 12 2Z"/>
      <path d="M7.3333 10.6667C8.0697 10.6667 8.6666 11.2636 8.6666 12C8.6666 12.7364 8.0697 13.3333 7.3333 13.3333C6.5969 13.3333 6 12.7364 6 12C6 11.2636 6.5969 10.6667 7.3333 10.6667ZM12 10.6667C12.7364 10.6667 13.3333 11.2636 13.3333 12C13.3333 12.7364 12.7364 13.3333 12 13.3333C11.2636 13.3333 10.6667 12.7364 10.6667 12C10.6667 11.2636 11.2636 10.6667 12 10.6667ZM16.6667 10.6667C17.4031 10.6667 18 11.2636 18 12C18 12.7364 17.4031 13.3333 16.6667 13.3333C15.9303 13.3333 15.3334 12.7364 15.3334 12C15.3334 11.2636 15.9303 10.6667 16.6667 10.6667Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
