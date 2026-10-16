import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CircleArrowLeft({ size = 24, ...props }: IconProps) {
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
      <path d="M12 1C17.937 1 23 6.0629 23 12C23 17.937 17.937 23 12 23C6.0629 23 1 17.937 1 12C1 6.0629 6.0629 1 12 1ZM11.4984 6.9894L7.0889 11.2836C6.6859 11.6762 6.6859 12.3238 7.0889 12.7164L11.4983 17.0112L12.8938 15.5776L10.2471 13L17 13L17 11L10.2471 11L12.8939 8.423L11.4984 6.9894Z" fill="currentColor"/>
    </svg>
  )
}
