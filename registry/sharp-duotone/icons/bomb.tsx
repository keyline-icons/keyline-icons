import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Bomb({ size = 24, ...props }: IconProps) {
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
      <path d="M10.5858 10.5858L13.6568 7.5146L16.4854 10.3432L13.4142 13.4142M15.0711 8.9289L16.6874 7.3126L16.9803 7.0197M15.8507 4.1901L15.6521 3.4489L15.2639 2L15.0653 1.2588M19.2229 4.7771L19.5158 4.4842L20.5765 3.4235L20.8694 3.1306M19.8099 8.1493L20.5511 8.3479L22 8.7361L22.7412 8.9347" strokeOpacity="0.4"/>
      <path d="M12.9497 20.9497C11.6841 22.2154 9.9327 23 8 23C4.134 23 1 19.866 1 16C1 12.134 4.134 9 8 9C11.866 9 15 12.134 15 16C15 17.9327 14.2154 19.6841 12.9497 20.9497Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
