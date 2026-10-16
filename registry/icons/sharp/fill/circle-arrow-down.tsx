import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CircleArrowDown({ size = 24, ...props }: IconProps) {
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
      <path d="M12 1C17.937 1 23 6.0629 23 12C23 17.937 17.937 23 12 23C6.0629 23 1 17.937 1 12C1 6.0629 6.0629 1 12 1ZM11 7L11 13.7529L8.423 11.1061L6.9894 12.5016L11.2836 16.9111C11.6762 17.3141 12.3238 17.3141 12.7164 16.9111L17.0112 12.5017L15.5776 11.1062L13 13.7529L13 7L11 7Z" fill="currentColor"/>
    </svg>
  )
}
