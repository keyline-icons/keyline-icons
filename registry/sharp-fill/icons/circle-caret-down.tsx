import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CircleCaretDown({ size = 24, ...props }: IconProps) {
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
      <path d="M12 1C17.937 1 23 6.0629 23 12C23 17.937 17.937 23 12 23C6.0629 23 1 17.937 1 12C1 6.0629 6.0629 1 12 1ZM11.1258 17.4856C11.5068 18.1715 12.4932 18.1715 12.8742 17.4856L17.8742 8.4856C18.2445 7.8191 17.7625 7 17 7L7 7C6.2375 7 5.7555 7.8191 6.1258 8.4856L11.1258 17.4856Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
