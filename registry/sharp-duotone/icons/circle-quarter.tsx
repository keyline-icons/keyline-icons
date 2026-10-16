import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CircleQuarter({ size = 24, ...props }: IconProps) {
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
      <path d="M12 1C17.937 1 23 6.0629 23 12C23 17.937 17.937 23 12 23C6.0629 23 1 17.937 1 12C1 6.0629 6.0629 1 12 1Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M12 5L12 12L19 12C19 11.0807 18.8189 10.1705 18.4672 9.3212C18.1154 8.4719 17.5998 7.7003 16.9497 7.0503C16.2997 6.4002 15.5281 5.8846 14.6788 5.5328C13.8295 5.1811 12.9193 5 12 5Z" fill="currentColor"/>
    </svg>
  )
}
