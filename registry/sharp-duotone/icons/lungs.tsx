import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Lungs({ size = 24, ...props }: IconProps) {
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
      <path d="M10.9693 12.3313L10.051 20.5959C10.0049 21.0114 9.7052 21.3543 9.2997 21.4557L3.2415 22.9702C3.1622 22.99 3.0808 23 2.999 23C2.6295 23 2.2901 22.7963 2.1164 22.4702C1.3834 21.0942 1 19.5591 1 18C1 14.1716 3.2962 10.7166 6.826 9.2341C7.1938 9.0796 7.5887 9 7.9877 9C9.6445 9 10.9877 10.3431 10.9877 12C10.9877 12.1107 10.9816 12.2213 10.9693 12.3313ZM13.0307 12.3313C13.0184 12.2213 13.0123 12.1107 13.0123 12C13.0123 10.3431 14.3555 9 16.0123 9C16.4113 9 16.8062 9.0796 17.174 9.2341C20.7038 10.7166 23 14.1716 23 18C23 19.5591 22.6166 21.0942 21.8836 22.4702C21.7099 22.7963 21.3705 23 21.001 23C20.9192 23 20.8378 22.99 20.7585 22.9702L14.7003 21.4557C14.2948 21.3543 13.9951 21.0114 13.949 20.5959L13.0307 12.3313Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M12 1L12 2L12 6M12 6L9.0995 10.3375M12 6L14.9005 10.3375M9.7778 14C8.7315 14.1548 7.7785 14.6886 7.1 15.5L6.8002 15.8585M14.2222 14C15.2685 14.1548 16.2215 14.6886 16.9 15.5L17.1998 15.8585"/>
    </svg>
  )
}
