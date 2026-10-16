import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CircleBarChart({ size = 24, ...props }: IconProps) {
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
      <path d="M12 1C17.937 1 23 6.0629 23 12C23 17.937 17.937 23 12 23C6.0629 23 1 17.937 1 12C1 6.0629 6.0629 1 12 1ZM9 9.6667L9 17L7 17L7 9.6667L9 9.6667ZM13 7L13 17L11 17L11 7L13 7ZM17 12.3333L17 17L15 17L15 12.3333L17 12.3333Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
